# ⚡ 1. Use JDK 8 (includes Nashorn JS engine needed for the Text4Shell exploit)
FROM openjdk:8-jdk-alpine

# 🧰 2. Install required tools
RUN apk update && apk add --no-cache bash curl tar procps

# 🧩 3. Install Maven (3.6.3 is fine)
ARG MAVEN_VERSION=3.6.3
ARG USER_HOME_DIR="/root"
ARG BASE_URL=https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries
RUN mkdir -p /usr/share/maven /usr/share/maven/ref \
  && curl -fsSL -o /tmp/maven.tar.gz ${BASE_URL}/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
  && tar -xzf /tmp/maven.tar.gz -C /usr/share/maven --strip-components=1 \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn \
  && rm -f /tmp/maven.tar.gz
ENV MAVEN_HOME /usr/share/maven
ENV MAVEN_CONFIG "$USER_HOME_DIR/.m2"

# 📂 4. Set working directory
WORKDIR /app

# 📦 5. Copy your Maven project files into the container
COPY . /app

# 🧱 6. Build the app
RUN mvn clean package -DskipTests

# 🌐 7. Expose the default Spring Boot port
EXPOSE 8080

# 🚀 8. Run the built JAR
CMD ["java", "-jar", "target/kakashi-jutsu-2.1.1.RELEASE.jar"]
