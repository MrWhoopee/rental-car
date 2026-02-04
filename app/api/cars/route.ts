import { api } from "../api";
import { NextResponse } from "next/server";
import { logErrorResponse } from "../_utils/utils";
import { isAxiosError } from "axios";

export async function GET() {
  try {
    const response = await api.get("/cars");
    return NextResponse.json(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
