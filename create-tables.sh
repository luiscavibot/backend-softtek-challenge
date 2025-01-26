#!/bin/bash

DYNAMODB_ENDPOINT="http://localhost:8000"

echo "Creando tabla FusionadosHistory..."
aws dynamodb create-table \
  --table-name FusionadosHistory \
  --attribute-definitions AttributeName=PK,AttributeType=S AttributeName=SK,AttributeType=S \
  --key-schema AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url $DYNAMODB_ENDPOINT

echo "Creando tabla StarWarsPlanets..."
aws dynamodb create-table \
  --table-name StarWarsPlanets \
  --attribute-definitions AttributeName=PK,AttributeType=S AttributeName=SK,AttributeType=S \
  --key-schema AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url $DYNAMODB_ENDPOINT

echo "Tablas creadas."
