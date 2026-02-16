from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel, create_engine
import datetime as dt

class UserBase(SQLModel):
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)

class User(UserBase, table=True):
    __tablename__ = "user"
    id: Optional[int] = Field(default=None, primary_key=True)
    password_hash: str
    
    tasks: List["Task"] = Relationship(back_populates="user")

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[dt.date] = Field(default=None)
    status: str = Field(default="pending")

class Task(TaskBase, table=True):
    __tablename__ = "task"
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")

    user: User = Relationship(back_populates="tasks")

class TaskCreate(TaskBase):
    pass

class TaskRead(TaskBase):
    id: int

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[dt.date] = None
    status: Optional[str] = None
