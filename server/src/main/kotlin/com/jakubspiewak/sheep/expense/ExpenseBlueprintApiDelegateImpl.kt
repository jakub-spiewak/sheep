package com.jakubspiewak.sheep.expense

import com.jakubspiewak.sheep.generated.api.ExpenseBlueprintApiDelegate
import com.jakubspiewak.sheep.generated.model.ExpenseBlueprintCreateRequest
import com.jakubspiewak.sheep.generated.model.ExpenseBlueprintResponse
import com.jakubspiewak.sheep.generated.model.ExpenseBlueprintUpdateRequest
import org.bson.types.ObjectId
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class ExpenseBlueprintApiDelegateImpl(private val repository: ExpenseBlueprintRepository) : ExpenseBlueprintApiDelegate {
    override fun createExpenseBlueprint(expenseBlueprintCreateRequest: ExpenseBlueprintCreateRequest): ResponseEntity<ExpenseBlueprintResponse> {
        val expenseBlueprintDocument = ExpenseBlueprintDocument(
            id = ObjectId(),
            name = expenseBlueprintCreateRequest.name,
            estimatedAmount = expenseBlueprintCreateRequest.estimatedAmount,
            frequency = expenseBlueprintCreateRequest.frequency,
            startDate = expenseBlueprintCreateRequest.startDate,
            endDate = expenseBlueprintCreateRequest.endDate,
            tags = expenseBlueprintCreateRequest.tags?.map { ObjectId(it) } ?: listOf()
        )
        repository.save(expenseBlueprintDocument)

        val response = expenseBlueprintDocument.toResponse()
        return ResponseEntity.ok(response)
    }

    override fun deleteExpenseBlueprint(blueprintId: String): ResponseEntity<Unit> {
        val objectId = ObjectId(blueprintId)
        repository.deleteById(objectId)
        return ResponseEntity.noContent().build()
    }

    override fun getExpenseBlueprintById(blueprintId: String): ResponseEntity<ExpenseBlueprintResponse> {
        val objectId = ObjectId(blueprintId)
        val expenseBlueprint = repository.findById(objectId)

        return if (expenseBlueprint.isPresent) {
            ResponseEntity.ok(expenseBlueprint.get().toResponse())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    override fun getExpenseBlueprints(): ResponseEntity<List<ExpenseBlueprintResponse>> {
        val expenseBlueprints = repository.findAll()
        val response = expenseBlueprints.map { it.toResponse() }
        return ResponseEntity.ok(response)
    }

    override fun updateExpenseBlueprint(
        blueprintId: String,
        expenseBlueprintUpdateRequest: ExpenseBlueprintUpdateRequest
    ): ResponseEntity<ExpenseBlueprintResponse> {
        val objectId = ObjectId(blueprintId)
        val existingBlueprintOptional = repository.findById(objectId)

        if (existingBlueprintOptional.isEmpty) {
            return ResponseEntity.notFound().build()
        }

        val existingBlueprint = existingBlueprintOptional.get()
        val updatedBlueprint = existingBlueprint.copy(
            name = expenseBlueprintUpdateRequest.name ?: existingBlueprint.name,
            estimatedAmount = expenseBlueprintUpdateRequest.estimatedAmount ?: existingBlueprint.estimatedAmount,
            frequency = expenseBlueprintUpdateRequest.frequency ?: existingBlueprint.frequency,
            startDate = expenseBlueprintUpdateRequest.startDate ?: existingBlueprint.startDate,
            endDate = expenseBlueprintUpdateRequest.endDate ?: existingBlueprint.endDate,
            tags = expenseBlueprintUpdateRequest.tags?.map { ObjectId(it) } ?: existingBlueprint.tags
        )

        repository.save(updatedBlueprint)
        val response = updatedBlueprint.toResponse()
        return ResponseEntity.ok(response)
    }

}