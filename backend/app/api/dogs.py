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
                res = await client.get(next_page_url)
                res.raise_for_status()
            except httpx.HTTPStatusError as e:
                return {"error": f"HTTP error occurred: {e.response.status_code} - {e.response.text}"}
            except httpx.RequestError as e:
                return {"error": f"Request error occurred: {str(e)}"}
                
            data = res.json()

            page_breeds = data.get("data", [])
            breeds.extend(page_breeds)

            # Get next page if exists
            next_page_url = data.get("links", {}).get("next")

    # Optional filtering
    if name:
        name = name.lower()
        breeds = [
            b for b in breeds
            if name in b.get("attributes", {}).get("name", "").lower()
        ]

    return {"breeds": breeds}
