from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from ..db import get_session
from ..models import Task, TaskCreate, TaskRead, TaskUpdate, User
from ..security import get_current_user

router = APIRouter()

# @router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
# def create_task(task: TaskCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
#     task_data = task.dict()
#     db_task = Task(**task_data, user_id=current_user.id)
#     session.add(db_task)
#     session.commit()
#     session.refresh(db_task)
#     return db_task

# @router.get("/", response_model=List[TaskRead])
# def read_tasks(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
#     tasks = session.exec(select(Task).where(Task.user_id == current_user.id)).all()
#     return tasks

# @router.get("/{task_id}", response_model=TaskRead)
# def read_task(task_id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
#     task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
#     if not task:
#         raise HTTPException(status_code=404, detail="Task not found")
#     return task

# @router.patch("/{task_id}", response_model=TaskRead)
# def update_task(task_id: int, task: TaskUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
#     db_task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
#     if not db_task:
#         raise HTTPException(status_code=404, detail="Task not found")
    
#     task_data = task.dict(exclude_unset=True)
#     for key, value in task_data.items():
#         setattr(db_task, key, value)
    
#     session.add(db_task)
#     session.commit()
#     session.refresh(db_task)
#     return db_task

# @router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
# def delete_task(task_id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
#     task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.id)).first()
#     if not task:
#         raise HTTPException(status_code=404, detail="Task not found")
    
#     session.delete(task)
#     session.commit()
#     return None
