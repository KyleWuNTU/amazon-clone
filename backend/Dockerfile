# 使用官方的 OpenJDK 22 基础镜像
FROM openjdk:22

# 设置工作目录
WORKDIR /app

# 复制 Maven 构建的 JAR 文件到镜像中
COPY target/demo-0.0.1-SNAPSHOT.jar /app/demo-0.0.1-SNAPSHOT.jar

# 指定容器启动时运行的命令
CMD ["java", "-jar", "/app/demo-0.0.1-SNAPSHOT.jar"]
