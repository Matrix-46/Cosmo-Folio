import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

gallery_match = re.search(r'    <!-- Certificates Gallery -->.*?    </section>\n', content, re.DOTALL)
if gallery_match:
    gallery_str = gallery_match.group(0)
    # Remove from original location
    content = content.replace(gallery_str, '')

    # Create new ordered gallery
    new_gallery_str = '''    <!-- Certificates Gallery -->
    <section class="certificates-gallery">
        <div class="container" style="max-width: 100%; padding: 0;">
            <h2 class="section-title">Certifications Gallery</h2>
            <div class="scrolling-wrapper">
                <div class="scrolling-content">
                    <img src="images/Agentic AI Certificate.jpeg" alt="Agentic AI Certificate">
                    <img src="images/Agentic AI Badge.jpeg" alt="Agentic AI Badge">
                    <img src="images/Python.jpeg" alt="Python Certificate">
                    <img src="images/J2EE.jpeg" alt="J2EE Certificate">
                    <img src="images/Int WEB.jpeg" alt="Web Certificate">
                    <img src="images/Int IJP.jpeg" alt="IJP Certificate">
                    <img src="images/DAC.jpeg" alt="DAC Certificate">
                    <img src="images/Ict Academy.jpeg" alt="ICT Academy Certificate">
                    <img src="images/Dasara.jpeg" alt="Dasara Certificate">
                    <img src="images/BU.jpeg" alt="BU Certificate">
                    <!-- Duplicate for seamless scroll -->
                    <img src="images/Agentic AI Certificate.jpeg" alt="Agentic AI Certificate">
                    <img src="images/Agentic AI Badge.jpeg" alt="Agentic AI Badge">
                    <img src="images/Python.jpeg" alt="Python Certificate">
                    <img src="images/J2EE.jpeg" alt="J2EE Certificate">
                    <img src="images/Int WEB.jpeg" alt="Web Certificate">
                    <img src="images/Int IJP.jpeg" alt="IJP Certificate">
                    <img src="images/DAC.jpeg" alt="DAC Certificate">
                    <img src="images/Ict Academy.jpeg" alt="ICT Academy Certificate">
                    <img src="images/Dasara.jpeg" alt="Dasara Certificate">
                    <img src="images/BU.jpeg" alt="BU Certificate">
                </div>
            </div>
        </div>
    </section>\n\n'''

    # Insert before contact section
    content = content.replace('    <!-- Contact Section -->', new_gallery_str + '    <!-- Contact Section -->')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Successfully moved and ordered gallery.')
else:
    print('Gallery not found.')
