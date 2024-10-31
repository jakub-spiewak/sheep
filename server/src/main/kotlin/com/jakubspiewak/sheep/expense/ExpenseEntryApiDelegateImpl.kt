package com.jakubspiewak.sheep.expense

import com.jakubspiewak.sheep.generated.api.ExpenseEntryApiDelegate
import com.jakubspiewak.sheep.generated.model.ExpenseEntryCreateRequest
import com.jakubspiewak.sheep.generated.model.ExpenseEntryResponse
import com.jakubspiewak.sheep.generated.model.ExpenseEntryUpdateRequest
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class ExpenseEntryApiDelegateImpl: ExpenseEntryApiDelegate {
    override fun createExpenseEntry(expenseEntryCreateRequest: ExpenseEntryCreateRequest): ResponseEntity<ExpenseEntryResponse> {
        TODO("Not yet implemented")
    }

    override fun deleteExpenseEntry(entryId: String): ResponseEntity<Unit> {
        TODO("Not yet implemented")
    }

    override fun getExpenseEntries(): ResponseEntity<List<ExpenseEntryResponse>> {
        TODO("Not yet implemented")
    }

    override fun getExpenseEntryById(entryId: String): ResponseEntity<ExpenseEntryResponse> {
        TODO("Not yet implemented")
    }

    override fun updateExpenseEntry(
        entryId: String,
        expenseEntryUpdateRequest: ExpenseEntryUpdateRequest
    ): ResponseEntity<ExpenseEntryResponse> {
        TODO("Not yet implemented")
    }
}