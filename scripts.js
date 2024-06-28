// scripts.js
const { jsPDF } = window.jspdf;

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function generateCV() {
    // Obtém os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const age = calculateAge(dob);
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const photo = document.getElementById('photo').files[0];

    // Cria o HTML do currículo
    const cvHTML = `
        <h2>${name}</h2>
        <p><strong>Idade:</strong> ${age} anos</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <h3>Educação</h3>
        <p>${education}</p>
        <h3>Experiência</h3>
        <p>${experience}</p>
        <h3>Habilidades</h3>
        <p>${skills}</p>
    `;

    // Exibe o currículo na seção cv-output
    document.getElementById('cv-output').innerHTML = cvHTML;

    // Cria um documento PDF
    const doc = new jsPDF();

    // Adiciona conteúdo estilizado ao PDF
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(name, 10, 20);

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`Idade: ${age} anos`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Telefone: ${phone}`, 10, 50);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Educação", 10, 60);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(education, 10, 70);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Experiência", 10, 80);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(experience, 10, 90);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Habilidades", 10, 100);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(skills, 10, 110);

    // Adiciona a foto ao PDF
    if (photo) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgData = event.target.result;
            doc.addImage(imgData, 'JPEG', 150, 10, 50, 50); // Ajuste a posição e o tamanho da imagem conforme necessário
            doc.save(`${name}_Curriculo.pdf`);
        };
        reader.readAsDataURL(photo);
    } else {
        doc.save(`${name}_Curriculo.pdf`);
    }
}
