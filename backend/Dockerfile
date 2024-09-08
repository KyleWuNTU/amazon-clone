# Use the official OpenJDK 22 base image
FROM openjdk:22

# This is the directory where the application will be built
WORKDIR /app

# Copy the JAR file from the Maven build to the image
COPY target/demo-0.0.1-SNAPSHOT.jar /app/demo-0.0.1-SNAPSHOT.jar

# Command to run the application
CMD ["java", "-jar", "/app/demo-0.0.1-SNAPSHOT.jar"]
