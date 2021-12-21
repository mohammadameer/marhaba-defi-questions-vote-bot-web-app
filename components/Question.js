import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Text,
  Textarea,
  toast,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDeleteQuestion, useUpdateQuestion } from "../hooks/questions";

const Question = ({
  question,
  selectedQuestion,
  setSelectedQuestion,
  refetch,
}) => {
  const toast = useToast();

  const { mutate: deleteQuestion, isLoading: deleting } = useDeleteQuestion();
  const { mutate: updateQuestion, isLoading: updating } = useUpdateQuestion();
  const [answer, setAnswer] = useState(question.answer);

  return (
    <Box key={question?.number} w={["100%", "100%", "33%"]} p="2">
      <Box
        boxShadow="lg"
        borderColor="green.500"
        borderWidth="1px"
        borderRadius="md"
        p="2"
        position="relative"
      >
        <Text fontSize="xl">{question?.question}</Text>
        <Text fontSize="sm">votes: {question?.votes}</Text>
        <Textarea
          mt="4"
          disabled={
            updating ||
            (deleting && selectedQuestion?.number == question?.number)
          }
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button
          mt="4"
          isFullWidth={true}
          disabled={
            deleting ||
            (updating && selectedQuestion?.number == question?.number)
          }
          onClick={() => {
            setSelectedQuestion(question);
            updateQuestion(
              { number: question.number, answer },
              {
                onSuccess: () => {
                  setSelectedQuestion(null);

                  toast({
                    title: "questions has been updated.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                },
              }
            );
          }}
        >
          Update
        </Button>
        <IconButton
          icon={<DeleteIcon />}
          position="absolute"
          right="2"
          top="2"
          disabled={
            updating ||
            (deleting && selectedQuestion?.number == question?.number)
          }
          onClick={() => {
            setSelectedQuestion(question);
            deleteQuestion(question?.number, {
              onSuccess: () => {
                refetch();
                setSelectedQuestion(null);
                toast({
                  title: "questions has been removed.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              },
            });
          }}
        />
      </Box>
    </Box>
  );
};

export default Question;
