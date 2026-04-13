"use client"

import { useState, useRef } from "react"
import styles from "./styles.module.css"
import layout from "@/app/theme/layout.module.css"
import ctas from "@/app/theme/ctas.module.css"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState("idle") // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("")
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Something went wrong.")
      }

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMsg(err.message)
    }
  }

  const handleReset = () => {
    setStatus("idle")
    setErrorMsg("")
  }

  return (
    <section className={layout.container}>
      <h3>Get in touch</h3>

      <div className={styles.grid}>
        <div className={styles.left}>
          <h6>
            Have a project, question, or just want to say hello? Fill in the
            form and I&rsquo;ll get back to you as soon as possible.
          </h6>
        </div>
        <div className={styles.right}>
          <div className={styles.formWrapper}>
            {status === "success" ? (
              <div className={styles.successState}>
                <h2 className={styles.successHeading}>Message sent!</h2>
                <p className={styles.successText}>
                  Thanks for reaching out. I&rsquo;ll be in touch shortly.
                </p>
                <div className={styles.successIcon}>✓</div>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
              >
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.input}
                      disabled={status === "sending"}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      disabled={status === "sending"}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    disabled={status === "sending"}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Your message…"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea}`}
                    disabled={status === "sending"}
                  />
                </div>

                {status === "error" && (
                  <p className={styles.errorMsg} role="alert">
                    {errorMsg || "Failed to send. Please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  className={ctas.submitBtn}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message <span className={styles.arrow}>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
