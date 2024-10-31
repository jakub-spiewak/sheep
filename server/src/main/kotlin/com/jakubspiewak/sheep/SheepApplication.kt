package com.jakubspiewak.sheep

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

//@SpringBootApplication(nameGenerator = FullyQualifiedAnnotationBeanNameGenerator::class)
@SpringBootApplication
//@ComponentScan(
//    basePackages = ["org.openapitools", "com.jakubspiewak.sheep.generated.api", "com.jakubspiewak.sheep.generated.model", "com.jakubspiewak.sheep"],
//    nameGenerator = FullyQualifiedAnnotationBeanNameGenerator::class
//)
//@EnableMongoRepositories
class SheepApplication

fun main(args: Array<String>) {
    runApplication<SheepApplication>(*args)
}
