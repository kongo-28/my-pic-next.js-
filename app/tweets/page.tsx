"use client";
import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import axios from "axios";
import { useEffect, useState } from "react";

type Tweet = {
  id: number;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const TweetIndex = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [selectedTweetId, setSelectedTweetId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/tweets")  // Tweet全件取得のRailsのAPIを叩いている
      .then((res) => res.json())
      .then((tweets) => setTweets(tweets));
  }, []);

  const selectedTweet = tweets.find((tweet) => tweet.id === selectedTweetId);

  const handleShowDetails = (id?: number) => setSelectedTweetId(id || null);

  const deleteTweet = async (id: number) => {
    await axios.delete(`http://localhost:3000/tweets/${id}`); // 指定したTweetを削除するRailsのAPIを叩いている
    setTweets(tweets.filter((tweet) => tweet.id !== id));
  };

  return (
    <>
      <Typography variant="h4" align="center">
      {/* Tweet List */}
      </Typography>
      <TableContainer>
        <Table sx={{ maxWidth: 650 }} align="center">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>tweet</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tweets.map((tweet) => {
              return (
                <TableRow key={tweet.id}>
                  <TableCell>{tweet.name}</TableCell>
                  <TableCell>{tweet.content}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      // color="primary"
                      // size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleShowDetails(tweet.id)}
                    >
                      SHOW
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      // color="error"
                      // size="small"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => deleteTweet(tweet.id)}
                    >
                      DESTROY
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedTweet && (
        <Modal open>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "lightblue",
              p: 4,
              borderRadius: "0.5em",
            }}
          >
            <Box component="p">ID: {selectedTweet.id}</Box>
            <Box component="p">Title: {selectedTweet.name}</Box>
            <Box component="p">Body: {selectedTweet.content}</Box>
            <Box component="p">CreatedAt: {selectedTweet.created_at}</Box>
            <Box component="p">UpdatedAt: {selectedTweet.updated_at}</Box>
            <Button onClick={() => handleShowDetails()} variant="contained">
              Close ✖️
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default TweetIndex;