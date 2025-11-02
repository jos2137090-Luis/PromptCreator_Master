# python/database_manager.py

import sqlite3
import os

class DatabaseManager:
    """
    Manages all database operations for the Prompt Creator Master.
    """
    def __init__(self, db_file):
        """
        Initializes the database manager and connects to the DB.
        """
        # Ensure the database directory exists
        db_dir = os.path.dirname(db_file)
        if not os.path.exists(db_dir):
            os.makedirs(db_dir)
            
        self.conn = sqlite3.connect(db_file)
        self.cursor = self.conn.cursor()
        print("Database connection established.")

    def create_tables(self):
        """
        Creates all necessary tables if they don't already exist.
        This matches the schema from Session 3[cite: 525].
        """
        try:
            # Table: prompts (The Vault) [cite: 527]
            self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS prompts (
                prompt_id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                purpose TEXT,
                category_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories (category_id)
            );
            """)

            # Table: prompt_versions (Version history) [cite: 528]
            # This is the core of the version control system [cite: 534]
            self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS prompt_versions (
                version_id INTEGER PRIMARY KEY AUTOINCREMENT,
                prompt_id INTEGER NOT NULL,
                prompt_text TEXT NOT NULL,
                representative_image_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (prompt_id) REFERENCES prompts (prompt_id) ON DELETE CASCADE
            );
            """)

            # Table: abandoned_prompts (Auto-saved incomplete) [cite: 529, 535]
            self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS abandoned_prompts (
                session_id INTEGER PRIMARY KEY AUTOINCREMENT,
                lens_type TEXT NOT NULL,
                session_data TEXT, -- Storing answers as JSON
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)

            # Table: categories (User-defined categories) [cite: 530]
            self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS categories (
                category_id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            );
            """)

            # Table: tags (User-defined tags) [cite: 531]
            self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS tags (
                tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            );
            """)
            
            # Table: prompt_tags (Linker table for many-to-many relationship)
            self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS prompt_tags (
                prompt_id INTEGER,
                tag_id INTEGER,
                PRIMARY KEY (prompt_id, tag_id),
                FOREIGN KEY (prompt_id) REFERENCES prompts (prompt_id) ON DELETE CASCADE,
                FOREIGN KEY (tag_id) REFERENCES tags (tag_id) ON DELETE CASCADE
            );
            """)
            
            self.conn.commit()
            print("All tables created successfully.")
            
        except sqlite3.Error as e:
            print(f"An error occurred while creating tables: {e}")

    def close(self):
        """Closes the database connection."""
        if self.conn:
            self.conn.close()
            print("Database connection closed.")

# --- This part is for testing ---
# It will run ONLY if you execute this file directly
if __name__ == "__main__":
    # Define the path relative to the project root
    # This places the DB in the 'database/' folder 
    DB_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', 'database', 'prompt_master.db')
    
    print(f"Database file will be at: {DB_FILE_PATH}")
    
    db_manager = DatabaseManager(db_file=DB_FILE_PATH)
    db_manager.create_tables()
    
    # Test data insertion 
    try:
        print("Testing database with dummy data...")
        
        # Add a test category
        db_manager.cursor.execute("INSERT OR IGNORE INTO categories (name) VALUES (?)", ("Test Category",))
        category_id = db_manager.cursor.lastrowid
        
        # Add a test prompt
        db_manager.cursor.execute("INSERT INTO prompts (title, purpose, category_id) VALUES (?, ?, ?)", 
                                 ("Test Prompt", "To test the database.", category_id))
        prompt_id = db_manager.cursor.lastrowid
        
        # Add a test version for that prompt
        db_manager.cursor.execute("INSERT INTO prompt_versions (prompt_id, prompt_text) VALUES (?, ?)",
                                 (prompt_id, "This is the text of the test prompt."))
        
        # Add a test tag
        db_manager.cursor.execute("INSERT OR IGNORE INTO tags (name) VALUES (?)", ("test",))
        tag_id = db_manager.cursor.lastrowid
        
        # Link the tag to the prompt
        db_manager.cursor.execute("INSERT INTO prompt_tags (prompt_id, tag_id) VALUES (?, ?)", (prompt_id, tag_id))
        
        # Add a test abandoned prompt
        db_manager.cursor.execute("INSERT INTO abandoned_prompts (lens_type, session_data) VALUES (?, ?)",
                                 ("Architect", '{"q1": "test answer"}'))
        
        db_manager.conn.commit()
        print("Dummy data inserted successfully.")
        
    except sqlite3.Error as e:
        print(f"An error occurred during test data insertion: {e}")
    finally:
        db_manager.close()