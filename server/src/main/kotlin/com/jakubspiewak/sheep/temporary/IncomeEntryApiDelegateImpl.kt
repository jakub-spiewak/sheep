package com.jakubspiewak.sheep.temporary

import com.jakubspiewak.sheep.generated.api.IncomeEntryApiDelegate
import com.jakubspiewak.sheep.generated.model.IncomeEntryCreateRequest
import com.jakubspiewak.sheep.generated.model.IncomeEntryResponse
import com.jakubspiewak.sheep.generated.model.IncomeEntryUpdateRequest
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class IncomeEntryApiDelegateImpl: IncomeEntryApiDelegate {
    override fun createIncomeEntry(incomeEntryCreateRequest: IncomeEntryCreateRequest): ResponseEntity<IncomeEntryResponse> {
        TODO("Not yet implemented")
    }

    override fun deleteIncomeEntry(entryId: String): ResponseEntity<Unit> {
        TODO("Not yet implemented")
    }

    override fun getIncomeEntries(): ResponseEntity<List<IncomeEntryResponse>> {
        TODO("Not yet implemented")
    }

    override fun getIncomeEntryById(entryId: String): ResponseEntity<IncomeEntryResponse> {
        TODO("Not yet implemented")
    }

    override fun updateIncomeEntry(
        entryId: String,
        incomeEntryUpdateRequest: IncomeEntryUpdateRequest
    ): ResponseEntity<IncomeEntryResponse> {
        TODO("Not yet implemented")
    }

}