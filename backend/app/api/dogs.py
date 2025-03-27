from fastapi import APIRouter, Query
import httpx

router = APIRouter()
BASE_URL = "https://dogapi.dog/api/v2/breeds"

@router.get("/breeds")
async def get_all_breeds(name: str = Query(None)):
    breeds = []
    next_page_url = BASE_URL

    async with httpx.AsyncClient() as client:
        while next_page_url:
            try:
                res = await client.get(next_page_url)  # Awaiting the asynchronous call
                res.raise_for_status()

                data = res.json()  # Move this line inside the try block

                page_breeds = data.get("data", [])  # Move this line inside the try block
                breeds.extend(page_breeds)  # Move this line inside the try block

                # Get next page if exists
                next_page_url = data.get("links", {}).get("next")  # Move this line inside the try block

            except httpx.HTTPStatusError as e:
                return {"error": f"HTTP error occurred: {e.response.status_code} - {e.response.text}"}
            except httpx.RequestError as e:
                return {"error": f"Request error occurred: {str(e)}"}
            except Exception as e:  # Catch any other exceptions
                return {"error": f"An error occurred: {str(e)}"}

    # Optional filtering
    if name:
        name = name.lower()
        breeds = [
            b for b in breeds
            if name in b.get("attributes", {}).get("name", "").lower()
        ]

    return {"breeds": breeds}