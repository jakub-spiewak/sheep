package com.jakubspiewak.sheep.expense.entry

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ExpenseEntryRepository : MongoRepository<ExpenseEntryDocument, ObjectId> {

    fun findByTagsContains(tags: ObjectId): List<ExpenseEntryDocument>

    fun findByBlueprintIdIs(blog: ObjectId): List<ExpenseEntryDocument>
}