package com.jakubspiewak.sheep.tag

import com.jakubspiewak.sheep.generated.api.TagApiDelegate
import com.jakubspiewak.sheep.generated.model.TagCreateRequest
import com.jakubspiewak.sheep.generated.model.TagResponse
import com.jakubspiewak.sheep.generated.model.TagUpdateRequest
import org.bson.types.ObjectId
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class TagApiDelegateImpl(val repository: TagRepository) : TagApiDelegate {

    override fun createTag(tagCreateRequest: TagCreateRequest): ResponseEntity<TagResponse> {
        val newTag = TagDocument(ObjectId.get(), tagCreateRequest.name)
        val savedTag = repository.save(newTag)
        return ResponseEntity.ok(savedTag.toResponse())
    }

    override fun deleteTag(tagId: String): ResponseEntity<Unit> {
        val objId = ObjectId(tagId)
        repository.deleteById(objId)
        return ResponseEntity.noContent().build()
    }

    override fun getTagById(tagId: String): ResponseEntity<TagResponse> {
        val objId = ObjectId(tagId)
        val tag = repository.findById(objId).orElseThrow { RuntimeException("Tag not found") }
        return ResponseEntity.ok(tag.toResponse())
    }

    override fun getTags(): ResponseEntity<List<TagResponse>> {
        val tags = repository.findAll().map { it.toResponse() }
        return ResponseEntity.ok(tags)
    }

    override fun updateTag(tagId: String, tagUpdateRequest: TagUpdateRequest): ResponseEntity<TagResponse> {
        val objId = ObjectId(tagId)
        val existingTag = repository.findById(objId).orElseThrow { RuntimeException("Tag not found") }
        val updatedTag = existingTag.copy(name = tagUpdateRequest.name)
        repository.save(updatedTag)
        return ResponseEntity.ok(updatedTag.toResponse())
    }

}