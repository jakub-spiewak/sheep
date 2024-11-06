package com.jakubspiewak.sheep.expense.entry

import com.jakubspiewak.sheep.generated.api.ExpenseEntryApiDelegate
import com.jakubspiewak.sheep.generated.model.ExpenseEntryCreateRequest
import com.jakubspiewak.sheep.generated.model.ExpenseEntryResponse
import com.jakubspiewak.sheep.generated.model.ExpenseEntryUpdateRequest
import org.bson.types.ObjectId
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class ExpenseScheduleEntriesApiDelegateImpl(private val repository: ExpenseEntryRepository) : ExpenseEntryApiDelegate {

    override fun createExpenseEntry(expenseEntryCreateRequest: ExpenseEntryCreateRequest): ResponseEntity<ExpenseEntryResponse> {
        val document = ExpenseEntryDocument(
            id = ObjectId(),
            amount = expenseEntryCreateRequest.amount,
            date = expenseEntryCreateRequest.date,
            name = expenseEntryCreateRequest.name ?: "",
            blueprintId = expenseEntryCreateRequest.blueprintId?.let { ObjectId(it) },
            tags = expenseEntryCreateRequest.tags?.map { ObjectId(it) } ?: listOf()
        )
        val savedEntry = repository.save(document)
        return ResponseEntity.ok(savedEntry.toResponse())
    }

    override fun deleteExpenseEntry(entryId: String): ResponseEntity<Unit> {
        repository.deleteById(ObjectId(entryId))
        return ResponseEntity.noContent().build()
    }

    override fun getExpenseEntries(): ResponseEntity<List<ExpenseEntryResponse>> {
        val entries = repository.findAll().map { it.toResponse() }
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