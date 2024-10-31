package com.jakubspiewak.sheep

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration

@SpringBootApplication
class SheepApplication

fun main(args: Array<String>) {
    runApplication<SheepApplication>(*args)
}

@Configuration
class SecurityConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        return http.cors {
            it.configurationSource {
                val configuration = CorsConfiguration()
                configuration.allowedOrigins = listOf("*")
                configuration.allowedMethods = listOf("*")
                configuration.allowedHeaders = listOf("*")
                configuration.exposedHeaders = listOf("*")
                return@configurationSource configuration
            }
        }
            .csrf { it.disable() }
            .build()
    }
}

