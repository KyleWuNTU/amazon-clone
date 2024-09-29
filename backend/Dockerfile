# Build Stage
FROM openjdk:22 AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
COPY src ./src

# Ensure the Maven wrapper is executable and build the application
RUN chmod +x mvnw && ./mvnw package -DskipTests

# Run Stage
FROM openjdk:22
WORKDIR /run_app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar ./app.jar

# Create a non-root user and set permissions
RUN groupadd -r spring-boot && useradd -r -g spring-boot spring-boot
USER spring-boot:spring-boot

EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/run_app/app.jar"]