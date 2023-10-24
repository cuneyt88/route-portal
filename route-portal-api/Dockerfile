FROM openjdk:11

ARG JAR_FILE=target/*.jar
ADD target/RoutePortal.jar RoutePortal.jar

ENTRYPOINT ["java","-jar","RoutePortal.jar"]



