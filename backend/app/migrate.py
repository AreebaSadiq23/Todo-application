"""
Database migration script to add new columns to existing tables.
Run this after updating models.py
"""
import os
from sqlmodel import SQLModel, text
from .db import engine, init_db

def migrate():
    """Add missing columns to existing tables"""
    with engine.connect() as conn:
        # Check if task table needs my_day column
        try:
            conn.execute(text("ALTER TABLE task ADD COLUMN my_day BOOLEAN DEFAULT 0"))
            print("✓ Added my_day column to task table")
        except Exception as e:
            if "duplicate column" in str(e).lower() or "already exists" in str(e).lower():
                print("ℹ my_day column already exists")
            else:
                print(f"✗ Error adding my_day: {e}")
        
        # Check if task table needs list_id column
        try:
            conn.execute(text("ALTER TABLE task ADD COLUMN list_id INTEGER"))
            print("✓ Added list_id column to task table")
        except Exception as e:
            if "duplicate column" in str(e).lower() or "already exists" in str(e).lower():
                print("ℹ list_id column already exists")
            else:
                print(f"✗ Error adding list_id: {e}")
        
        conn.commit()
    
    # Create new tables (task_list, etc.)
    print("\nCreating new tables...")
    init_db()
    print("✓ Database migration complete!")

if __name__ == "__main__":
    migrate()
