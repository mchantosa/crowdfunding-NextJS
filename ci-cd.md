# CI/CD Configuration for Crowdfunding Application

This document outlines the configuration of the Continuous Integration and Continuous Deployment (CI/CD) processes for the crowdfunding application. The application utilizes Playwright for end-to-end testing and Jest for unit testing.

## Overview

- **End-to-End Testing:** Utilizes Playwright to run comprehensive tests that simulate user interactions.
- **Unit Testing:** Utilizes Jest for running isolated tests on individual components.

## CI/CD Configuration

1. **GitHub Integration**

   - All CI/CD processes are configured through GitHub Actions.

2. **Unit Testing**
   - Unit tests are automatically triggered on pull requests for _any_ branch using Jest.
3. **End-to-End Testing**

   - End-to-end tests are performed on pull requests specifically targeting the _main branch_.
   - The tests run against a localhost Ethereum node, which is accessed through an ngrok gateway.

4. **Branch Management**
   - Pushes to branches are disabled to ensure that all changes go through pull requests.

## Setting Up Local Environment

To set up your local environment for testing, follow these steps:

1. Start a local Ethereum node.
2. Configure ngrok to expose the localhost to the public.
3. Ensure that your CI/CD configurations in GitHub reflect your local setup.

## Conclusion

This configuration provides a robust testing framework that ensures all changes to the crowdfunding application are thoroughly vetted before being merged. By implementing automated testing for both unit and end-to-end scenarios, we can maintain a high standard of code quality and application stability.

_For additional information or assistance, please reach out to the development team._
