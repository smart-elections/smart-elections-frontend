# Smart Contract Voting System Interface

Small documentation to further understand the flow of the website.

## Routes

All the routes of the website

### Login

Route: `/login`

### Signup

Route: `/register`

### Election Analysis

Route:  `/`

Fetches the results of the latest completed elections and displays them.

> **NOTE:** This is the dashboard  

### Elections

Routes:

 1. All elections: `/elections`
 2. Voting for an election:  `/elections/voting/:year/:electionId`
 3. Election analytics: `/elections/analytics/:year/:electionId`

Purpose:

 1. Fetches and displays all the available elections
 2. Fetches the data for the  requested election (available for voting)
 3. Fetches and displays the election data for displaying analytics

### Candidates

Routes:

 1. All candidates: `/candidates`
 2. Single Candidate:  `/candidates/:candidateId`

Purpose:

 1. Fetches and displays all the available candidates
 2. Fetches and displays the data for the requested candidate (single candidate)

### Profile

Route: `/profile`

Fetches and displays the data of authenticated user

### News

Route: `/news`

Using external api or something to fetch latest news and display them

## TODO

- Create a flowchart ?

