package com.jakubspiewak.sheep.income

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface IncomeBlueprintRepository : MongoRepository<IncomeBlueprintDocument, ObjectId> {

}