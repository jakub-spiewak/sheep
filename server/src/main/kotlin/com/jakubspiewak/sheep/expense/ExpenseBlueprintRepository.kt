package com.jakubspiewak.sheep.expense

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ExpenseBlueprintRepository : MongoRepository<ExpenseBlueprint, ObjectId>