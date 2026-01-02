from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import numpy as np
import sympy as sp
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransformRequest(BaseModel):
    vector: List[float]  # length 3
    matrix: List[List[float]]  # 3x3

@app.get("/")
def root():
    return {"message": "Backend is running"}

import time

@app.post("/api/transform")
def transform_vector(data: TransformRequest):
    start_time = time.time()
    
    # Validate dimensions
    if len(data.vector) != 3 or any(len(row) != 3 for row in data.matrix):
        raise HTTPException(status_code=400, detail="Vector must be length 3 and matrix must be 3x3")

    # Numerical computation (NumPy)
    vec_np = np.array(data.vector)
    mat_np = np.array(data.matrix)
    result_np = mat_np @ vec_np

    # Symbolic computation (SymPy)
    x, y, z = sp.symbols("x y z")
    vec_sym = sp.Matrix([x, y, z])
    mat_sym = sp.Matrix(data.matrix)
    result_sym = mat_sym * vec_sym

    steps = []
    for i in range(3):
        row = mat_sym.row(i)
        expr = row.dot(sp.Matrix(data.vector))
        steps.append(f"Row {i+1}: {expr} = {result_np[i]}")

    end_time = time.time()
    execution_time_ms = (end_time - start_time) * 1000

    return {
        "input_vector": data.vector,
        "input_matrix": data.matrix,
        "result": result_np.tolist(),
        "symbolic_form": str(result_sym),
        "steps": steps,
        "execution_time_ms": round(execution_time_ms, 2)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
