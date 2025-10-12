FROM maven:3.6.3-jdk-8 AS builder
WORKDIR /build

COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN mvn -B -DskipTests dependency:go-offline

COPY . .
RUN mvn -B -DskipTests package

FROM openjdk:8-jre-slim
LABEL maintainer="abu@h7tex.com"

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl gnupg2 gosu wget uuid-runtime \
  && rm -rf /var/lib/apt/lists/*

RUN groupadd -r ctf && useradd -r -g ctf -m -d /home/ctf ctf \
 && mkdir -p /flag /app \
 && chown root:ctf /flag /app

WORKDIR /app

COPY --from=builder /build/target/*.jar /app/app.jar

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENV JAVA_OPTS="-Xms128m -Xmx256m -XX:MetaspaceSize=64m -XX:MaxMetaspaceSize=96m -XX:+UseSerialGC -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]