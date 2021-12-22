import {
  Box,
  Button,
  Fade,
  Skeleton,
  Spinner,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Question from "../components/Question";
import { useQuestions } from "../hooks/questions";

export default function Home() {
  const [onlyNotAnswered, setOnlyNotAnswered] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();

  const {
    data: questions,
    isLoading,
    refetch,
  } = useQuestions({
    saved: onlySaved,
    answered: onlyNotAnswered ? false : true,
  });

  useEffect(() => {
    refetch();
  }, [onlyNotAnswered, onlySaved]);

  return (
    <Box p="2">
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold">
          Marhaba Defi Questions Vote Bot
        </Text>
        <Button onClick={refetch}>Refetch</Button>
      </Box>

      <Box display="flex" mt="4">
        <Box display="flex" mr="4">
          <Switch
            isChecked={onlyNotAnswered}
            onChange={() => setOnlyNotAnswered(!onlyNotAnswered)}
          />
          <Text ml="2">Only Not Answered</Text>
        </Box>
        <Box display="flex">
          <Switch
            isChecked={onlySaved}
            onChange={() => setOnlySaved(!onlySaved)}
          />
          <Text ml="2">Saved</Text>
        </Box>
      </Box>

      {!isLoading ? (
        <Box>
          {questions?.length > 0 ? (
            <Box mt="4" display="flex" flexWrap="wrap">
              {questions?.map((question) => (
                <Question
                  key={question.number}
                  question={question}
                  selectedQuestion={selectedQuestion}
                  setSelectedQuestion={setSelectedQuestion}
                  refetch={refetch}
                />
              ))}
            </Box>
          ) : (
            <Box
              display="flex"
              flexDir="column"
              pt="20"
              alignItems="center"
              justifyItems="center"
            >
              <Text fontSize="2xl">there is no questions</Text>
            </Box>
          )}
        </Box>
      ) : (
        <Box display="flex" flexDir="column" pt="20" h="64">
          <Spinner
            alignSelf="center"
            thickness="4px"
            speed="0.65s"
            emptyColor="green.500"
            color="blue.200"
            size="xl"
          />
        </Box>
      )}
    </Box>
  );
}
