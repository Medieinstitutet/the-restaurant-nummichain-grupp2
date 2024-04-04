import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import "../styles/contact.scss";
import contactImg from "/contact.svg";

export const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <h2>
                    Have questions or feedback? We&apos;d love to hear from you!
                </h2>
            </div>
            <div className="contact-body">
                <div className="contact-form">
                    <h3>Via this contact form:</h3>

                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div className="contact-info">
                    <h3>You can also reach us via:</h3>
                    <ul>
                        <li>
                            <IconMail /> support@therestaurant.com
                        </li>
                        <li>
                            <IconPhone /> 123-456-7890
                        </li>
                        <li>
                            <IconMapPin /> 245 Oak Street, Suite 200,
                            Springfield, IL 62701
                        </li>
                    </ul>
                    <img
                        src={contactImg}
                        alt="Illustration for the contact us page"
                        width={600}
                        height={600}
                    />
                </div>
            </div>
        </div>
    );
};
