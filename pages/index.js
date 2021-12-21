import { Box, Button, Fade, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import Question from "../components/Question";
import { useQuestions } from "../hooks/questions";

export default function Home() {
  const { data: questions, isLoading, refetch } = useQuestions();

  const [selectedQuestion, setSelectedQuestion] = useState();

  return (
    <Box p="2">
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold">
          Marhaba Defi Questions Vote Bot
        </Text>
        <Button onClick={refetch}>Refetch</Button>
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
