from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, func

from ..db import get_session
from ..models import Task, TaskCreate, TaskRead, TaskUpdate, TaskList, TaskListCreate, TaskListRead, User
from ..security import get_current_user

router = APIRouter()

# Task List Routes
@router.post("/lists", response_model=TaskListRead, status_code=status.HTTP_201_CREATED)
def create_list(
    list_data: TaskListCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_list = TaskList(**list_data.model_dump(), user_id=current_user.id)
    session.add(db_list)
    session.commit()
    session.refresh(db_list)
    return db_list

@router.get("/lists", response_model=List[TaskListRead])
def read_lists(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    lists = session.exec(select(TaskList).where(TaskList.user_id == current_user.id)).all()
    return lists

@router.get("/lists/{list_id}", response_model=TaskListRead)
def read_list(
    list_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task_list = session.exec(
        select(TaskList).where(TaskList.id == list_id, TaskList.user_id == current_user.id)
    ).first()
    if not task_list:
        raise HTTPException(status_code=404, detail="List not found")
    return task_list

@router.patch("/lists/{list_id}", response_model=TaskListRead)
def update_list(
    list_id: int,
    list_data: TaskListCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task_list = session.exec(
        select(TaskList).where(TaskList.id == list_id, TaskList.user_id == current_user.id)
    ).first()
    if not task_list:
        raise HTTPException(status_code=404, detail="List not found")
    
    for key, value in list_data.model_dump(exclude_unset=True).items():
        setattr(task_list, key, value)
    
    session.add(task_list)
    session.commit()
    session.refresh(task_list)
    return task_list

@router.delete("/lists/{list_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_list(
    list_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task_list = session.exec(
        select(TaskList).where(TaskList.id == list_id, TaskList.user_id == current_user.id)
    ).first()
    if not task_list:
        raise HTTPException(status_code=404, detail="List not found")
    
    session.delete(task_list)
    session.commit()
    return None

# Task Routes
@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    task: TaskCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_task = Task(**task.model_dump(), user_id=current_user.id)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.get("/", response_model=List[TaskRead])
def read_tasks(
    current_user: User = Depends(get_current_user),
    status_filter: Optional[str] = Query(None),
    my_day: Optional[bool] = Query(None),
    list_id: Optional[int] = Query(None),
    session: Session = Depends(get_session)
):
    statement = select(Task).where(Task.user_id == current_user.id)
    
    if status_filter:
        statement = statement.where(Task.status == status_filter)
    if my_day is not None:
        statement = statement.where(Task.my_day == my_day)
    if list_id is not None:
        statement = statement.where(Task.list_id == list_id)
    
    tasks = session.exec(statement).all()
    return tasks

@router.get("/{task_id}", response_model=TaskRead)
def read_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.patch("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    task: TaskUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    task_data = task.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)

    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()
    return None
