package com.jakubspiewak.sheep.expense.entry

import com.jakubspiewak.sheep.generated.api.ExpenseEntryApiDelegate
import com.jakubspiewak.sheep.generated.model.ExpenseEntryCreateRequest
import com.jakubspiewak.sheep.generated.model.ExpenseEntryResponse
import com.jakubspiewak.sheep.generated.model.ExpenseEntryUpdateRequest
import org.bson.types.ObjectId
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.YearMonth

@Service
class ExpenseScheduleEntriesApiDelegateImpl(
    private val repository: ExpenseEntryRepository,
    private val mongoTemplate: MongoTemplate
) : ExpenseEntryApiDelegate {

    override fun createExpenseEntry(expenseEntryCreateRequest: ExpenseEntryCreateRequest): ResponseEntity<ExpenseEntryResponse> {
        val document = ExpenseEntryDocument(
            id = ObjectId(),
            amount = expenseEntryCreateRequest.amount,
            date = expenseEntryCreateRequest.date,
            name = expenseEntryCreateRequest.name ?: "",
            blueprintId = expenseEntryCreateRequest.blueprintId
                ?.let { it.ifBlank { null } }
                ?.let(::ObjectId),
            tags = expenseEntryCreateRequest.tags?.map(::ObjectId) ?: listOf()
        )
        val savedEntry = repository.save(document)
        return ResponseEntity.ok(savedEntry.toResponse())
    }

    override fun deleteExpenseEntry(entryId: String): ResponseEntity<Unit> {
        repository.deleteById(ObjectId(entryId))
        return ResponseEntity.noContent().build()
    }

    override fun getExpenseEntries(
        month: String?,
        scheduleId: String?,
        anyOfTags: List<String>?,
        allOfTags: List<String>?,
        sort: String?,
        order: String?
    ): ResponseEntity<List<ExpenseEntryResponse>> {
        val query = Query()

        when (scheduleId) {
            "null" -> {
                query.addCriteria(Criteria.where("blueprintId").isNull())
            }

            else -> {
                scheduleId
                    ?.let(::ObjectId)
                    ?.let(Criteria.where("blueprintId")::`is`)
                    ?.let(query::addCriteria)
            }
        }

        month
            ?.let(YearMonth::parse)
            ?.let { Criteria.where("date").gte(it.atDay(1)).lte(it.atEndOfMonth()) }
            ?.let(query::addCriteria)

        anyOfTags
            ?.map(::ObjectId)
            ?.let(Criteria.where("tags")::`in`)
            ?.let(query::addCriteria)

        allOfTags
            ?.map(::ObjectId)
            ?.let(Criteria.where("tags")::all)
            ?.let(query::addCriteria)

        sort?.let { Sort.by(if (order == "desc") Sort.Direction.DESC else Sort.Direction.ASC, it) }
            ?.let(query::with)

        val entries = mongoTemplate.find(query, ExpenseEntryDocument::class.java).map { it.toResponse() }
        return ResponseEntity.ok(entries)
    }

    override fun getExpenseEntryById(entryId: String): ResponseEntity<ExpenseEntryResponse> {
        val entry = repository.findById(ObjectId(entryId))
        return entry.map { ResponseEntity.ok(it.toResponse()) }
            .orElse(ResponseEntity.notFound().build())
    }

    override fun updateExpenseEntry(
        entryId: String,
        expenseEntryUpdateRequest: ExpenseEntryUpdateRequest
    ): ResponseEntity<ExpenseEntryResponse> {
        val existingEntry = repository.findById(ObjectId(entryId)).orElseThrow { RuntimeException("Entry not found") }

        val updatedEntry = existingEntry.copy(
            amount = expenseEntryUpdateRequest.amount ?: existingEntry.amount,
            date = expenseEntryUpdateRequest.date ?: existingEntry.date,
            name = expenseEntryUpdateRequest.name ?: existingEntry.name,
            blueprintId = expenseEntryUpdateRequest.blueprintId?.let { ObjectId(it) } ?: existingEntry.blueprintId,
            tags = expenseEntryUpdateRequest.tags?.map { ObjectId(it) } ?: existingEntry.tags
        )

        repository.save(updatedEntry)
        return ResponseEntity.ok(updatedEntry.toResponse())
    }

}