package com.jakubspiewak.sheep.tag

import com.jakubspiewak.sheep.generated.model.TagResponse
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document


@Document(collection = "tag")
data class TagDocument(
    @Id
    val id: ObjectId,
    val name: String,
) {
    fun toResponse() = TagResponse(id.toHexString(), name)
}
