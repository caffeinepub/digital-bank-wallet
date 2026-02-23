# Specification

## Summary
**Goal:** Add email and password input fields to the login interface to support credential-based authentication.

**Planned changes:**
- Add email input field with email format validation to the login interface
- Add password input field with masked input for security
- Style input fields consistently with the existing warm neutral design aesthetic
- Update backend user profile schema to include email field
- Implement secure password hashing before storage in the backend
- Add backend methods to validate credentials during authentication

**User-visible outcome:** Users can enter their email and password on the login screen alongside the existing Internet Identity authentication option.
