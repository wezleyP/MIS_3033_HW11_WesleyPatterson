using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MIS_3033_HW11_WesleyPatterson.Models;

public partial class Patient
{
    [Key]
    [Column("ID")]
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    [Column("age")]
    public int Age { get; set; }

    [Column("weight")]
    public double Weight { get; set; }

    [Column("BMI")]
    public double Bmi { get; set; }

    [Column("BMILevel")]
    public string Bmilevel { get; set; } = null!;

    public string GetBMILevel() 
    {
        if(this.Bmi < 18.5)
        {
            this.Bmilevel = "Underweight";
        }
        else if(this.Bmi < 25)
        {
            this.Bmilevel = "Healthy Weight";
        }
        else if(this.Bmi < 30)
        {
            this.Bmilevel = "Overweight";
        }
        else
        {
            this.Bmilevel = "Obesity";
        }
        return this.Bmilevel;
    }
}
