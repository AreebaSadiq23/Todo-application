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
    task_lists: List["TaskList"] = Relationship(back_populates="user")

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

class TaskListBase(SQLModel):
    name: str
    description: Optional[str] = None
    created_at: dt.datetime = Field(default_factory=dt.datetime.utcnow)

class TaskList(TaskListBase, table=True):
    __tablename__ = "task_list"
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")

    user: User = Relationship(back_populates="task_lists")
    tasks: List["Task"] = Relationship(back_populates="task_list")

class TaskListCreate(SQLModel):
    name: str
    description: Optional[str] = None

class TaskListRead(TaskListBase):
    id: int
    user_id: int
    task_count: Optional[int] = 0

class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[dt.date] = Field(default=None)
    status: str = Field(default="pending")
    my_day: bool = Field(default=False)
    list_id: Optional[int] = Field(default=None, foreign_key="task_list.id")

class Task(TaskBase, table=True):
    __tablename__ = "task"
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")

    user: User = Relationship(back_populates="tasks")
    task_list: Optional["TaskList"] = Relationship(back_populates="tasks")

class TaskCreate(TaskBase):
    pass

class TaskRead(TaskBase):
    id: int
    list_name: Optional[str] = None

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[dt.date] = None
    status: Optional[str] = None
    my_day: Optional[bool] = None
    list_id: Optional[int] = None
