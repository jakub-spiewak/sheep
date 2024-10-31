package com.jakubspiewak.sheep.temporary

import com.jakubspiewak.sheep.generated.api.IncomeBlueprintApiDelegate
import com.jakubspiewak.sheep.generated.model.IncomeBlueprintCreateRequest
import com.jakubspiewak.sheep.generated.model.IncomeBlueprintResponse
import com.jakubspiewak.sheep.generated.model.IncomeBlueprintUpdateRequest
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class IncomeBlueprintApiDelegateImpl: IncomeBlueprintApiDelegate {
    override fun createIncomeBlueprint(incomeBlueprintCreateRequest: IncomeBlueprintCreateRequest): ResponseEntity<IncomeBlueprintResponse> {
        TODO("Not yet implemented")
    }

    override fun deleteIncomeBlueprint(blueprintId: String): ResponseEntity<Unit> {
        TODO("Not yet implemented")
    }

    override fun getIncomeBlueprintById(blueprintId: String): ResponseEntity<IncomeBlueprintResponse> {
        TODO("Not yet implemented")
    }

    override fun getIncomeBlueprints(): ResponseEntity<List<IncomeBlueprintResponse>> {
        TODO("Not yet implemented")
    }

    override fun updateIncomeBlueprint(
        blueprintId: String,
        incomeBlueprintUpdateRequest: IncomeBlueprintUpdateRequest
    ): ResponseEntity<IncomeBlueprintResponse> {
        TODO("Not yet implemented")
    }
}