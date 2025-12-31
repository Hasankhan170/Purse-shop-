export default function Contact() {
  return (
    <section className="py-10 bg-warm-ivory">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-deep-mocha">
          Contact Us
        </h1>
       
        <form
          action="https://formspree.io/f/mqageaoo"
          method="POST"
          className="bg-white dark:bg-dark p-8 rounded-2xl shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-4 border border-cloud-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-4 border border-cloud-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full p-4 border border-cloud-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-4 border border-cloud-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            required
            className="w-full p-4 border border-cloud-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-deep-mocha text-white py-4 rounded-xl text-lg font-semibold hover:bg-soft-gold transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
