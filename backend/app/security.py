from datetime import timedelta
import datetime as dt
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt # Changed from better_auth import JWT
from dotenv import load_dotenv

from .db import get_session
from .models import User

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# No longer instantiating JWT class directly
# jwt = JWT(secret_key=SECRET_KEY, algorithm=ALGORITHM)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire_timestamp = dt.datetime.now(dt.timezone.utc) + expire
    to_encode.update({"exp": expire_timestamp}) # Correctly setting the expiration time
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), session = Depends(get_session)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # Changed to jwt.decode
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise credentials_exception
    except Exception:
        raise credentials_exception
    
    user = session.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user
