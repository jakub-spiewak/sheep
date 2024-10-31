import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.9.25"
    kotlin("plugin.spring") version "1.9.25"
    id("org.springframework.boot") version "3.3.4"
    id("io.spring.dependency-management") version "1.1.6"
    id("org.graalvm.buildtools.native") version "0.10.3"
    id("org.openapi.generator") version "7.9.0"
}

apply(plugin = "org.openapi.generator")

group = "com.jakubspiewak"
version = "0.0.1-SNAPSHOT"

springBoot {
    mainClass.set("com.jakubspiewak.sheep.SheepApplicationKt")
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
    implementation("io.swagger.core.v3:swagger-annotations:2.2.25")
    implementation("io.swagger.core.v3:swagger-core:2.2.25")
    implementation("jakarta.validation:jakarta.validation-api:3.1.0")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
    implementation("org.springframework.boot:spring-boot-starter-web")
//    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core")
//    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactive")
//    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
//    implementation("org.springframework.boot:spring-boot-starter-data-mongodb-reactive")
//    implementation("org.springframework.boot:spring-boot-starter-webflux")
}
val generatedTargetDirectory = "${layout.buildDirectory.get()}/generated"

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

java {
    withJavadocJar()
}


sourceSets {
     main {
        kotlin {
            srcDir("${generatedTargetDirectory}/src/main/kotlin")
            srcDir("${rootDir}/src/main/kotlin")
        }
     }
}

tasks.withType<KotlinCompile> {
    dependsOn("generateOpenApiClassess")
}

tasks.create("generateOpenApiClassess", org.openapitools.generator.gradle.plugin.tasks.GenerateTask::class.java) {
    group = "openapi"
    generatorName = ("kotlin-spring")
    inputSpec = ("$rootDir/specs/api.yaml")
    outputDir = generatedTargetDirectory
    apiPackage = "com.jakubspiewak.sheep.generated.api"
    packageName = "com.jakubspiewak.sheep.generated"
    modelPackage = "com.jakubspiewak.sheep.generated.model"
    configOptions = mapOf(
        "delegatePattern" to "true",
        "reactive" to "false",
        "useSpringBoot3" to "true",
        "useSpringController" to "true",
        "skipDefaultInterface" to "true",
        "useSwaggerUI" to "false",
    )
}