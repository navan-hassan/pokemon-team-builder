from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DB_CONNECTION: str
    WEB_CLIENT: str
    model_config = SettingsConfigDict(env_file=".env", extra='ignore')
