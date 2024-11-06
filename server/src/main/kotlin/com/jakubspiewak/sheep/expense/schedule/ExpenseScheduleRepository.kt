package com.jakubspiewak.sheep.expense.schedule

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ExpenseScheduleRepository : MongoRepository<ExpenseScheduleDocument, ObjectId> {

    fun findByTagsContains(tags: ObjectId): List<ExpenseScheduleDocument>
}