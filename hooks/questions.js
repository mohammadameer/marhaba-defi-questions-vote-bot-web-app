import axios from "axios";
import { useMutation, useQuery } from "react-query";

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";

const mainUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000/questions/"
    : "https://marhaba-defi-questions-vote-bo.herokuapp.com/questions/";

export const useQuestions = () =>
  useQuery("questions", () => axios.get(mainUrl).then(({ data }) => data));

export const useDeleteQuestion = () =>
  useMutation((number) =>
    axios.delete(mainUrl + number).then(({ data }) => data)
  );

export const useUpdateQuestion = () =>
  useMutation(({ number, answer }) =>
    axios.put(mainUrl + number, { answer }).then(({ data }) => data)
  );
