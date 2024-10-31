package com.jakubspiewak.sheep.temporary

import com.jakubspiewak.sheep.generated.api.TagApiDelegate
import com.jakubspiewak.sheep.generated.model.TagCreateRequest
import com.jakubspiewak.sheep.generated.model.TagResponse
import com.jakubspiewak.sheep.generated.model.TagUpdateRequest
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class TagApiDelegateImpl: TagApiDelegate {
    override fun createTag(tagCreateRequest: TagCreateRequest): ResponseEntity<TagResponse> {
        TODO("Not yet implemented")
    }

    override fun deleteTag(tagId: String): ResponseEntity<Unit> {
        TODO("Not yet implemented")
    }

    override fun getTagById(tagId: String): ResponseEntity<TagResponse> {
        TODO("Not yet implemented")
    }

    override fun getTags(): ResponseEntity<List<TagResponse>> {
        TODO("Not yet implemented")
    }

    override fun updateTag(tagId: String, tagUpdateRequest: TagUpdateRequest): ResponseEntity<TagResponse> {
        TODO("Not yet implemented")
    }
}