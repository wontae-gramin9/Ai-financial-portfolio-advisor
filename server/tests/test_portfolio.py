def test_get_snapshots_empty(client):
    response = client.get("/api/v1/snapshots")
    assert response.status_code == 200
    assert response.json() == []


def test_create_snapshot(client):
    payload = {
        "recorded_at": "2026-06-01T00:00:00Z",
        "total_value": 1000000,
        "base_currency": "KRW",
        "asset_groups": [
            {
                "country": "KR",
                "broker": "키움증권",
                "total_value": 1000000,
                "currency": "KRW",
                "assets": [
                    {
                        "name": "삼성전자",
                        "ticker": "000589",
                        "value": 500000,
                        "currency": "KRW",
                    },
                    {
                        "name": "현대차",
                        "ticker": "001234",
                        "value": 500000,
                        "currency": "KRW",
                    },
                ],
            }
        ],
    }
    response = client.post("/api/v1/snapshots", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["recorded_at"].startswith("2026-06-01")
    assert float(data["total_value"]) == payload["total_value"]
    assert data["base_currency"] == payload["base_currency"]
    assert len(data["asset_groups"]) == len(payload["asset_groups"])
