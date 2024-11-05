package com.jakubspiewak.sheep.income

import com.jakubspiewak.sheep.generated.api.IncomeBlueprintApiDelegate
import com.jakubspiewak.sheep.generated.model.IncomeBlueprintCreateRequest
import com.jakubspiewak.sheep.generated.model.IncomeBlueprintResponse
import com.jakubspiewak.sheep.generated.model.IncomeBlueprintUpdateRequest
import org.bson.types.ObjectId
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class IncomeBlueprintApiDelegateImpl(private val repository: IncomeBlueprintRepository) : IncomeBlueprintApiDelegate {

    override fun createIncomeBlueprint(incomeBlueprintCreateRequest: IncomeBlueprintCreateRequest): ResponseEntity<IncomeBlueprintResponse> {
        val document = IncomeBlueprintDocument(
            id = ObjectId.get(),
            name = incomeBlueprintCreateRequest.name,
            estimatedAmount = incomeBlueprintCreateRequest.estimatedAmount,
            startDate = incomeBlueprintCreateRequest.startDate,
            endDate = incomeBlueprintCreateRequest.endDate
        )
        val savedDocument = repository.save(document)
        return ResponseEntity.ok(savedDocument.toResponse())
    }

    override fun deleteIncomeBlueprint(blueprintId: String): ResponseEntity<Unit> {
        repository.deleteById(ObjectId(blueprintId))
        return ResponseEntity.noContent().build()
    }

    override fun getIncomeBlueprintById(blueprintId: String): ResponseEntity<IncomeBlueprintResponse> {
        val document = repository.findById(ObjectId(blueprintId))
        return document.map { ResponseEntity.ok(it.toResponse()) }
            .orElse(ResponseEntity.notFound().build())
    }

    override fun getIncomeBlueprints(): ResponseEntity<List<IncomeBlueprintResponse>> {
        val documents = repository.findAll()
        val responses = documents.map { it.toResponse() }
        return ResponseEntity.ok(responses)
    }

    override fun updateIncomeBlueprint(
        blueprintId: String,
        incomeBlueprintUpdateRequest: IncomeBlueprintUpdateRequest
    ): ResponseEntity<IncomeBlueprintResponse> {
        val optionalDocument = repository.findById(ObjectId(blueprintId))
        return if (optionalDocument.isPresent) {
            val document = optionalDocument.get()
            val updatedDocument = document.copy(
                name = incomeBlueprintUpdateRequest.name,
                estimatedAmount = incomeBlueprintUpdateRequest.estimatedAmount,
                startDate = incomeBlueprintUpdateRequest.startDate,
                endDate = incomeBlueprintUpdateRequest.endDate
            )
            repository.save(updatedDocument)
            ResponseEntity.ok(updatedDocument.toResponse())
        } else {
            ResponseEntity.notFound().build()
        }
    }

}