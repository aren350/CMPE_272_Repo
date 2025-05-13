import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateAIPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!title || !description) {
      setError("Title and Description are required");
      return;
    }
    setShowLoadingBar(true);
    setProgress(0);
    setLoading(true);
    let responseData = null;
    // Start the request immediately
    const payload = {
      title,
      description,
      tag,
      username: username || "unknown",
      priority: "medium", // default, backend may override
    };
    // Start fetch and loading bar in parallel
    const fetchPromise = fetch("http://127.0.0.1:5000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "AI request failed");
        responseData = data;
      })
      .catch((err) => {
        responseData = { error: err.message };
      });
    // Animate loading bar for 4 seconds
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 100;
      setProgress(Math.min((elapsed / 4000) * 100, 100));
      if (elapsed >= 4000) {
        clearInterval(interval);
        setShowLoadingBar(false);
      }
    }, 100);
    // Wait 4 seconds before showing result
    await new Promise((res) => setTimeout(res, 4000));
    // Wait for fetch to finish if it hasn't
    await fetchPromise;
    setLoading(false);
    setShowLoadingBar(false);
    setProgress(0);
    if (responseData && responseData.error) {
      setError(responseData.error);
    } else {
      setResult(responseData);
    }
  };

  return (
    <Container style={{ maxWidth: 600, marginTop: 40 }}>
      <Card className="shadow">
        <Card.Body>
          <Card.Title>AI Help Desk Functionality</Card.Title>
          <Card.Text>
            Use this form to create a ticket or query logs using AI-powered
            backend logic.
          </Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tag (for logs or categorization)</Form.Label>
              <Form.Control
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. audit, error, onboarding"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter ticket title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue or request"
                rows={3}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                disabled={loading || showLoadingBar}
              >
                {loading || showLoadingBar ? (
                  <>
                    <Spinner size="sm" animation="border" /> Submitting to AI
                    bot
                  </>
                ) : (
                  "Submit to AI"
                )}
              </Button>
            </div>
          </Form>
          {showLoadingBar && (
            <div className="mt-3">
              <div
                style={{ fontWeight: 500, color: "#007bff", marginBottom: 8 }}
              >
                Submitting to AI bot
              </div>
              <ProgressBar now={progress} animated striped variant="info" />
            </div>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {result && (
            <Alert
              variant="success"
              className="mt-3"
              style={{ whiteSpace: "pre-wrap" }}
            >
              <strong>AI Response:</strong>
              <br />
              {typeof result === "object"
                ? JSON.stringify(result, null, 2)
                : result}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateAIPage;
