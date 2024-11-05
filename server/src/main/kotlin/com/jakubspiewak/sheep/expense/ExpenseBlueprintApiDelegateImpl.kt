package com.jakubspiewak.sheep.expense

import com.jakubspiewak.sheep.generated.api.ExpenseScheduleApiDelegate
import com.jakubspiewak.sheep.generated.model.ExpenseScheduleCreateRequest
import com.jakubspiewak.sheep.generated.model.ExpenseScheduleResponse
import com.jakubspiewak.sheep.generated.model.ExpenseScheduleUpdateRequest
import org.bson.types.ObjectId
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class ExpenseScheduleApiDelegateImpl(private val repository: ExpenseScheduleRepository) : ExpenseScheduleApiDelegate {
    override fun createExpenseSchedule(expenseScheduleCreateRequest: ExpenseScheduleCreateRequest): ResponseEntity<ExpenseScheduleResponse> {
        val expenseBlueprintDocument = ExpenseScheduleDocument(
            id = ObjectId(),
            name = expenseScheduleCreateRequest.name,
            estimatedAmount = expenseScheduleCreateRequest.estimatedAmount,
            frequency = expenseScheduleCreateRequest.frequency,
            startDate = expenseScheduleCreateRequest.startDate,
            endDate = expenseScheduleCreateRequest.endDate,
            tags = expenseScheduleCreateRequest.tags?.map { ObjectId(it) } ?: listOf()
        )
        repository.save(expenseBlueprintDocument)

        val response = expenseBlueprintDocument.toResponse()
        return ResponseEntity.ok(response)
    }

    override fun deleteExpenseSchedule(blueprintId: String): ResponseEntity<Unit> {
        val objectId = ObjectId(blueprintId)
        repository.deleteById(objectId)
        return ResponseEntity.noContent().build()
    }

    override fun getExpenseScheduleById(blueprintId: String): ResponseEntity<ExpenseScheduleResponse> {
        val objectId = ObjectId(blueprintId)
        val expenseBlueprint = repository.findById(objectId)

        return if (expenseBlueprint.isPresent) {
            ResponseEntity.ok(expenseBlueprint.get().toResponse())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    override fun getExpenseSchedules(): ResponseEntity<List<ExpenseScheduleResponse>> {
        val expenseBlueprints = repository.findAll()
        val response = expenseBlueprints.map { it.toResponse() }
        return ResponseEntity.ok(response)
    }

    override fun updateExpenseSchedule(
        blueprintId: String,
        expenseScheduleUpdateRequest: ExpenseScheduleUpdateRequest
    ): ResponseEntity<ExpenseScheduleResponse> {
        val objectId = ObjectId(blueprintId)
        val existingBlueprintOptional = repository.findById(objectId)

        if (existingBlueprintOptional.isEmpty) {
            return ResponseEntity.notFound().build()
        }

        val existingBlueprint = existingBlueprintOptional.get()
        val updatedBlueprint = existingBlueprint.copy(
            name = expenseScheduleUpdateRequest.name ?: existingBlueprint.name,
            estimatedAmount = expenseScheduleUpdateRequest.estimatedAmount ?: existingBlueprint.estimatedAmount,
            frequency = expenseScheduleUpdateRequest.frequency ?: existingBlueprint.frequency,
            startDate = expenseScheduleUpdateRequest.startDate ?: existingBlueprint.startDate,
            endDate = expenseScheduleUpdateRequest.endDate ?: existingBlueprint.endDate,
            tags = expenseScheduleUpdateRequest.tags?.map { ObjectId(it) } ?: existingBlueprint.tags
        )

        repository.save(updatedBlueprint)
        val response = updatedBlueprint.toResponse()
        return ResponseEntity.ok(response)
    }

}