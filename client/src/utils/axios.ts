import { envObj } from "@/config/env";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: envObj.api_endpoint_v1 + "/api/v1",
});
