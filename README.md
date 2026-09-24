# Project : 01
# Campus Cable Network Management System

## Overview

A console-based C++ project that represents a campus cable network using **nodes and edges**. Campus buildings are nodes, while cable connections are represented as edges.

Each connection stores:

* Cable length
* Cost
* Capacity
* Current load
* Available bandwidth

The project contains campus locations such as Engineering Building, YKSG-2, RASG-1, Food Court, Auditorium, AB-4, Annex Building and other campus nodes.

## Main Features

* Show all campus nodes
* Show all cable connections
* Search connections by building name
* Modify cable length, cost, capacity and load
* Add new cable connections
* Add new campus buildings/nodes
* Check available bandwidth
* Validate current load against capacity

```text
Available Bandwidth = Capacity - Current Load
```

The project also includes a Binary Search function for searching connection records.

## Concepts Used

* C++ Structures
* Vectors
* Graph Representation
* Nodes and Edges
* Searching
* Binary Search
* Functions
* Loops and Conditions
* Dynamic Data Management

## Project Type

**Academic C++ / Data Structures & Graph Project**

## Learning Outcome

This project helped understand how real-world campus infrastructure can be represented using graphs and how network data can be searched, modified and managed programmatically.

# Projct : 02
# Government Land Management & Dakhila System

## Overview

A console-based C++ project designed to manage land records, Khotiyan information, tax calculation, Dakhila payments and system reports.

The project combines multiple data structures to simulate a basic land management system.

## Data Structures Used

### Doubly Linked List

Used to store and manage land/Khotiyan records.

### Queue

Used to process Dakhila payments in **FIFO (First In, First Out)** order.

### Stack

Used to maintain system activity logs.

## Main Features

* Admin login with password protection
* Add and delete Khotiyan records
* Search land records by ID
* Automatic land tax calculation
* Track paid and remaining tax
* Process multiple Dakhila payments
* View system logs
* Save and load records using `records.txt`
* Generate official `.txt` reports
* Deleted records are preserved separately

The tax calculation depends on land area and location, while the payment system updates the paid and due amounts after processing.

## Concepts Used

* Doubly Linked List
* Queue
* Stack
* Pointers
* Dynamic Memory
* File Handling
* Structures
* Searching
* Functions
* Menu-driven Programming

## Project Type

**Academic C++ / Data Structures Project**

## Learning Outcome

This project provided practical experience in using Linked List, Queue, Stack and File Handling together to build a complete record-management application.



# Project : 03
# Home Expense & Savings Management System

## Overview

A console-based C project designed to manage household expenses and calculate monthly expenses and yearly savings.

## Main Features

* Secure username and password login
* House rent, food, utilities and household expense categories
* Monthly expense calculation
* Per-person expense calculation
* Yearly savings calculation
* Extra cost and savings adjustment
* Password change through Settings
* Maximum login attempt protection

The project separates different operations into functions such as `HouseRent()`, `Food()`, `Utilities()`, `calculate()` and `savings()`.

## Calculation

```text
Total Expense = Sum of all expenses
Per Person Expense = Total Expense / Number of Members
```

The yearly savings module compares monthly running costs with fixed costs and calculates the final remaining savings.

## Concepts Used

* C Functions
* Arrays and Strings
* Loops
* If-Else
* Switch Case
* User Input/Output
* Basic Authentication
* Arithmetic Operations

## Project Type

**Academic C Programming Project — Console Application**

## Learning Outcome

This project helped practice function-based programming, user input handling, calculations, menu-driven systems and basic authentication in C.
